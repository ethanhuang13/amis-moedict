import React from 'react';
import Term from './Term.jsx';
import List from './List.jsx';
import RadicalTable from './RadicalTable.jsx';

export default class Result extends React.Component {
  render(){
    var ref$;
    console.trace("Render of RESULT called.");
    console.log("PROPS ARE: ", this.props);
    console.log("SWITCH ON: ", ((ref$ = this.props) != null && ref$.type));
    switch (this.props != null && this.props.type) {
    case 'term':
      return Term(this.props);
    case 'list':
      return List(this.props);
    case 'radical':
      return RadicalTable(this.props);
    case 'spin':
      return divInline({
        id: 'loading',
        style: {
          marginTop: '19px',
          marginLeft: '1px'
        }
      }, React.DOM.h1({}, this.props.id));
    case 'html':
      return divInline({
        dangerouslySetInnerHTML: {
          __html: this.props.html
        }
      });
    default:
      return React.DOM.div({})
    }
  }
};
