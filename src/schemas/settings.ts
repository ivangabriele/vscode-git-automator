export default {
  "id": "Settings",
  "type": "object",
  "properties": {
    "prefillCommitMessage": {
      "type": "object",
      "properties": {
        "prefillCommitMessage": {
          "type": "boolean"
        },
        "replacePatternWith": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "pattern": {
                "type": "string",
                "minLength": 1
              },
              "with": {
                "type": "string"
              }
            }
          }
        },
        "withFileWorkspacePath": {
          "type": "boolean"
        },
        "withGuessedAction": {
          "type": "boolean"
        }
      },
    }
  }
}
