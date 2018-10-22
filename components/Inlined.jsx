import React from 'react';

class Inlined extends React.Component {
  render() {
    const { style, ...props } = this.props;
    return (
      <div style={{ display: 'inline', ...style }} {...props} />
    );
  }
}

export default Inlined;
