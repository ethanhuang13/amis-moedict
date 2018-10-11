import React from 'react';

export default class List extends React.Component {
  render(it){
    var ref$, terms, id, H, LRU, list, btn, re, t;
    ref$ = this.props, terms = ref$.terms, id = ref$.id, H = ref$.H, LRU = ref$.LRU;
    if (!terms) {
      return div({});
    }
    H = replace$.call(H, /^#/, '');
    H = DotSlash + "#" + H;
    id = replace$.call(id, /^[@=]/, '');
    terms = replace$.call(terms, /^[^"]*/, '');
    list = [h1Name({}, id)];
    if (id === '字詞紀錄簿' && !terms) {
      btn = i({
        className: 'icon-bookmark-empty'
      });
      list = list.concat(p({
        className: 'bg-info'
      }, "（請按詞條右方的 ", btn, " 按鈕，即可將字詞加到這裡。）"));
    }
    function strToList(str){
      var re, t, it, results$ = [];
      re = /"([^"]+)"[^"]*/g;
      while (t = re.exec(str)) {
        it = t[1];
        results$.push(span({
          style: {
            clear: 'both',
            display: 'block'
          }
        }, '\u00B7', a({
          href: H + "" + it
        }, it)));
      }
      return results$;
    }
    if (/^";/.exec(terms)) {
      re = /";([^;"]+);([^;"]+)"[^"]*/g;
      list = list.concat(table.apply(null, [
        {}, tr.apply(null, [{}].concat((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = ['臺', '陸']).length; i$ < len$; ++i$) {
            it = ref$[i$];
            results$.push(th({
              width: 200
            }, span({
              className: 'part-of-speech'
            }, it)));
          }
          return results$;
        }())))
      ].concat((function(){
        var results$ = [];
        while (t = re.exec(terms)) {
          results$.push(tr.apply(null, [{
            style: {
              borderTop: '1px solid #ccc'
            }
          }].concat((fn$()))));
        }
        return results$;
        function fn$(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = [t[1], t[2]]).length; i$ < len$; ++i$) {
            it = ref$[i$];
            results$.push(td({}, a({
              href: H + "" + it
            }, it)));
          }
          return results$;
        }
      }()))));
    } else {
      list = list.concat(strToList(terms));
    }
    if (id === '字詞紀錄簿' && LRU) {
      re = /"([^"]+)"[^"]*/g;
      list = list.concat((br({}), h3({
        id: 'lru'
      }, '最近查閱過的字詞', input({
        id: 'btn-clear-lru',
        type: 'button',
        className: 'btn-default btn btn-tiny',
        value: '清除',
        style: {
          marginLeft: '10px'
        }
      }))));
      list = list.concat(strToList(LRU));
    }
    return divInline.apply(null, [{}].concat(slice$.call(list)));
  }
}
