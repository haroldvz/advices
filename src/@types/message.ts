export interface Message {
  type: MessaType; // The type of messages. Can be either noticed, warning or error.
  text: string;
}

enum MessaType {
  notice = "notice",
  warning = "warning",
  error = "error"
}
