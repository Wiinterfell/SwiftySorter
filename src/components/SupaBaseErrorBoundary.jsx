import { MessageBar, MessageBarBody, MessageBarTitle } from "@fluentui/react-components";
import React from "react";

export class SupabaseErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <MessageBar>
          <MessageBarBody>
            <MessageBarTitle>Oops! Something went wrong!</MessageBarTitle>
            {this.state.error.message}
          </MessageBarBody>
        </MessageBar>
      );
    }

    return this.props.children;
  }
}