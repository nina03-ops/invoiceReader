import { FormRecognizerClient, AzureKeyCredential, FormField } from "@azure/ai-form-recognizer";
import { CreateInvoiceDto } from "src/invoice/dto/create-invoice.dto";

export default async function recognizeInvoices(invoiceUrl: string) {
  const apiKey = process.env.FORM_RECOGNIZER_SUBSCRIPTION_KEY;
  const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT;
  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await client.beginRecognizeInvoicesFromUrl(invoiceUrl, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });

  const [invoice] = await poller.pollUntilDone();
  if (invoice === undefined) {
    throw new Error('Failed to extract data from at least one invoice.');
  }

  // Helper function to print fields.
  function fieldToString(field: FormField) {
    const { name, valueType, value, confidence } = field;
    return `${name} (${valueType}): '${value}' with confidence ${confidence}'`;
  }

  console.log("Invoice fields:");

  const invoicedto: CreateInvoiceDto = {};

  for (const [name, field] of Object.entries(invoice.fields)) {
    if (field.valueType !== 'array' && field.valueType !== 'object') {
      invoicedto[name] = field.value;
    }
  }
  for (const [name, field] of Object.entries(invoice.fields)) {
    if (field.valueType !== 'array' && field.valueType !== 'object') {
      console.log(`- ${name} ${fieldToString(field)}`);
    }
  }

  let idx = 0;

  console.log("- Items:");

  const items = invoice.fields["Items"]?.value as FormField[] | undefined;
  for (const item of items ?? []) {
    const value = item.value as Record<string, FormField>;

    const subFields = [
      "Description",
      "Quantity",
      "Unit",
      "UnitPrice",
      "ProductCode",
      "Date",
      "Tax",
      "Amount"
    ]
      .map((fieldName) => value[fieldName])
      .filter((field) => field !== undefined);

    console.log(
      [
        `  - Item #${idx}`,
        // Now we will convert those fields into strings to display
        ...subFields.map((field) => `    - ${fieldToString(field)}`),
      ].join('\n'),
    );
  }
  return invoicedto;
}