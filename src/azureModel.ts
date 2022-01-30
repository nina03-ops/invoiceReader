import { FormRecognizerClient, FormTrainingClient, AzureKeyCredential } from '@azure/ai-form-recognizer';

const apiKey = process.env.FORM_RECOGNIZER_SUBSCRIPTION_KEY;
const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT;
// const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));