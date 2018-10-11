import React from 'react';

export default class Term extends React.Component {
  render(){
    var ref$, LANG, H, ref1$, title, english, heteronyms, radical, translation, nrsCount, sCount, py, xrefs, tag, stem, aStroke, $char, list, res$, i$, len$, key, props;
    ref$ = this.props, LANG = ref$.LANG, H = (ref1$ = ref$.H) != null
      ? ref1$
      : HASHOF[LANG], title = ref$.title, english = ref$.english, heteronyms = ref$.heteronyms, radical = ref$.radical, translation = ref$.translation, nrsCount = ref$.non_radical_stroke_count, sCount = ref$.stroke_count, py = ref$.pinyin, xrefs = ref$.xrefs, tag = ref$.tag, stem = ref$.stem;
    H = replace$.call(H, /^#/, '');
    H = DotSlash + "#" + H;
    CurrentId = this.props.id;
    if (tag != null) {
      aStroke = span({
        className: 'part-of-speech'
      }, tag);
    } else {
      aStroke = '';
    }
    $char = radical
      ? div({
        className: 'radical'
      }, RadicalGlyph({
        H: H,
        char: replace$.call(radical, /<\/?a[^>]*>/g, '')
      }), span({
        className: 'count'
      }, span({
        className: 'sym'
      }, '+'), nrsCount), span({
        className: 'count'
      }, " = " + sCount), nbsp, aStroke)
      : div({
        className: 'radical'
      }, aStroke);
    if (!(heteronyms instanceof Array)) {
      heteronyms = [heteronyms];
    }
    res$ = [];
    for (i$ = 0, len$ = heteronyms.length; i$ < len$; ++i$) {
      key = i$;
      props = heteronyms[i$];
      res$.push(Heteronym(import$({
        key: key,
        $char: $char,
        H: H,
        LANG: LANG,
        title: title,
        py: py,
        english: english,
        CurrentId: CurrentId,
        stem: stem
      }, props)));
    }
    list = res$;
    if (xrefs != null && xrefs.length) {
      list = list.concat(XRefs({
        LANG: LANG,
        xrefs: xrefs
      }));
    }
    if (translation) {
      list = list.concat(Translations({
        translation: translation
      }));
    }
    return divInline.apply(null, [{}].concat(slice$.call(list)));
  }
}
