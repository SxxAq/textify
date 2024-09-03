import { pipeline, env } from "@xenova/transformers";
env.allowLocalModels = false;
env.useBrowserCache = false;
class MyTranslationPipeline {
  static task = "translation";
  static model = "Xenova/nllb-200-distilled-600M"; // Default model
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      try {
        this.instance = await pipeline(this.task, this.model, {
          progress_callback,
        });
      } catch (error) {
        throw new Error(`Failed to load the model: ${error.message}`);
      }
    }
    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  try {
    const { text, src_lang, tgt_lang } = event.data;

    // Send the "initiate" status
    self.postMessage({ status: "initiate" });

    // Get the translation pipeline
    const translator = await MyTranslationPipeline.getInstance((progress) => {
      self.postMessage({ status: "progress", progress });
    });

    // Perform the translation
    let output;
    try {
      output = await translator(text, {
        src_lang: src_lang,
        tgt_lang: tgt_lang,
      });
    } catch (err) {
      throw new Error(`Failed to translate text: ${err.message}`);
    }

    console.log("Translation output:", output); // Debug: Log the output

    // Check if the output is valid
    if (output && output[0] && output[0].translation_text) {
      // Send the result
      self.postMessage({
        status: "update",
        output: output[0].translation_text,
      });
    } else {
      throw new Error("Translation output is invalid or empty.");
    }

    // Send the "complete" status
    self.postMessage({ status: "complete" });
  } catch (error) {
    console.error("Translation error:", error); // Debug: Log the error
    self.postMessage({ status: "error", error: error.message });
  }
});
