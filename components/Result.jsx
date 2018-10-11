import React from 'react';
import Term from './Term.jsx';
import List from './List.jsx';

export default class Result extends React.Component {
  render(){
    var ref$;
    switch ((ref$ = this.props) != null && ref$.type) {
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
      }, h1({}, this.props.id));
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
