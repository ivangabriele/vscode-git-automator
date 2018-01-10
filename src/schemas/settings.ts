export default {
  "id": "Settings",
  "type": "object",
  "properties": {
    "prefillCommitMessage": {
      "type": "object",
      "properties": {
        "disableOptionalMessages": {
          "type": "boolean"
        },
        "forceLowerCase": {
          "type": "boolean"
        },
        "ignoreFileExtension": {
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
        },
        "withGuessedCustomActions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "pattern": {
                "type": "string",
                "minLength": 1
              },
              "state": {
                "enum": ["ADDED", "DELETED", "MODIFIED", "RENAMED"]
              },
              "with": {
                "type": "string"
              }
            }
        }
      },
    }
  }
}
