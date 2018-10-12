import React from 'react';

export default class RadicalTable extends React.Component {
  render(){
    var ref$, terms, id, H, title, rows, list, i$, len$, strokes, chars, chs, j$, len1$, ch;
    ref$ = this.props, terms = ref$.terms, id = ref$.id, H = ref$.H;
    id = replace$.call(id, /^[@=]/, '');
    if (/\S/.exec(id)) {
      title = h1Name({}, id + " ", a({
        className: 'xref',
        href: '#',
        title: '部首表'
      }, '部'));
    } else {
      H += '@';
      title = h1Name({}, '部首表');
    }
    if (typeof $ != 'undefined' && $ !== null) {
      rows = $.parseJSON(terms);
    } else {
      rows = JSON.parse(terms);
    }
    list = [];
    H = DotSlash + "" + H;
    for (i$ = 0, len$ = rows.length; i$ < len$; ++i$) {
      strokes = i$;
      chars = rows[i$];
      if (chars != null && chars.length) {
        chs = [];
        for (j$ = 0, len1$ = chars.length; j$ < len1$; ++j$) {
          ch = chars[j$];
          chs = chs.concat(a({
            key: ch,
            className: 'stroke-char',
            href: H + "" + ch
          }, ch));
          chs = chs.concat(' ');
        }
        list = list.concat(span({
          className: 'stroke-count'
        }, strokes));
        list = list.concat(span({
          className: 'stroke-list'
        }, chs));
        list = list.concat(hr({
          style: {
            margin: 0,
            padding: 0,
            height: 0
          }
        }));
      }
    }
    return divInline({}, title, div.apply(null, [{
      className: 'list'
    }].concat(slice$.call(list))));
  }
}
