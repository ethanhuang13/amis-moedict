import React from 'react';
import Term from './Term.jsx';
import List from './List.jsx';
import RadicalTable from './RadicalTable.jsx';

export default class Result extends React.Component {
  render(){
    var ref$;
    console.log("PROPS ARE: ", this.props);
    console.log("SWITCH ON: ", ((ref$ = this.props) != null && ref$.type));
    switch ((ref$ = this.props) != null && ref$.type) {
    case 'term':
      return Term(this.props);
    case 'list':
      return List(this.props);
    case 'radical':
      return RadicalTable(this.props);
    case 'spin':
      return React.DOM.divInline({
        id: 'loading',
        style: {
          marginTop: '19px',
          marginLeft: '1px'
        }
      }, h1({}, this.props.id));
    case 'html':
      return React.DOM.divInline({
        dangerouslySetInnerHTML: {
          __html: this.props.html
        }
      });
    default:
      return React.DOM.div({})
    }
  }
};
