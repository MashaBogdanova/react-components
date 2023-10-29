import React, { Component } from 'react';

interface IProps {
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}

class Pagination extends Component<IProps, null> {
  render() {
    return (
      <section>
        <button
          disabled={this.props.prevUrl === null}
          onClick={() => this.props.onPageChange(this.props.currentPage - 1)}
        >
          &lt;
        </button>
        <button
          disabled={this.props.nextUrl === null}
          onClick={() => this.props.onPageChange(this.props.currentPage + 1)}
        >
          &gt;
        </button>
      </section>
    );
  }
}

export default Pagination;
