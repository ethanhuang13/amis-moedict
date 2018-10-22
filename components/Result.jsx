import React from 'react';
import Term from './Term.jsx';
import List from './List.jsx';
import RadicalTable from './RadicalTable.jsx';
import Inlined from './Inlined.jsx';

export default class Result extends React.Component {
  render(){
    console.trace("Render of RESULT called.");
    console.log("PROPS ARE: ", this.props);
    console.log("SWITCH ON: ", (this.props && this.props.type));
    switch (this.props && this.props.type) {
      case 'term':
        return <Term {...this.props} />;
      case 'list':
        return <List {...this.props} />;
      case 'radical':
        return <RadicalTable {...this.props} />;
      case 'spin':
        return (
          <Inlined
            id="loading"
            style={{
              marginTop: 19,
              marginLeft: 1,
            }}
          >
            <h1>{this.props.id}</h1>
          </Inlined>
        );
      case 'html':
        return (
          <Inlined dangerouslySetInnerHTML={{ __html: this.props.html }} />
        );
      default:
        return <div />;
    }
  }
};
