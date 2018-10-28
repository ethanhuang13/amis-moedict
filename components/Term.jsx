import React from 'react';
import Inlined from './Inlined.jsx';
import Heteronym from './Heteronym.jsx';
// TODO: missing component Translations
// import Translations from './Translations.jsx';
// TODO: missing component XRefs
// import XRefs from './XRefs.jsx';
import { setCurrentId, replace } from './utils';

const HASHOF = { a: '#', t: "#'", h: '#:', c: '#~' };

export default class Term extends React.Component {
  render(){
    const {
      id,
      LANG,
      title,
      english,
      radical,
      translation,
      non_radical_stroke_count: nrsCount,
      stroke_count: sCount,
      pinyin: py,
      xrefs,
      tag,
      stem
    } = this.props;
    setCurrentId(id);

    let { H = HASHOF[LANG] } = this.props;
    H = replace(H, /^#/, '');
    H = DotSlash + "#" + H;

    const aStroke = tag
      ? <span className="part-of-speech">{tag}</span>
      : '';

    const $char = radical
      ? <div className="radical">
          <RadicalGlyph H={H} char={replace(radical, /<\/?a[^>]*>/g, '')} />
          <span className="count">
            <span className="sym">+</span>
            {nrsCount}
          </span>
          <span className="count">{` = ${sCount}`}</span>
          &nbsp;
          {aStroke}
        </div>
      : <div className="radical">{aStroke}</div>;

    let { heteronyms } = this.props;
    if (!(heteronyms instanceof Array)) {
      heteronyms = [heteronyms];
    }

    return (
      <Inlined>
        {heteronyms.map((props, i) =>
          <Heteronym
            key={i}
            $char={$char}
            H={H}
            LANG={LANG}
            title={title}
            py={py}
            english={english}
            CurrentId={id}
            stem={stem}
            {...props}
          />
        )}
        /*
        {xrefs && (xrefs.length !== 0) && <XRefs LANG={LANG} xrefs={xrefs} />}
        {translation && <Translations translation={translation} />}
        */
      </Inlined>
    );
  }
}
