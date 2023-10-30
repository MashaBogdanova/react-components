import React from 'react';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  isError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isError: false, errorMessage: '' };
  }

  componentDidCatch(error: Error) {
    console.log(error);
    this.setState({ isError: true, errorMessage: error.message });
  }

  render() {
    if (this.state.isError) {
      return (
        this.state.isError && (
          <p>
            Oops... Something went wrong. {this.state.errorMessage}. Reload the
            page.
          </p>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
