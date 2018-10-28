import React from 'react';
import Inlined from './Inlined.jsx';
// TODO: missing component DefinitionList
// import DefinitionList from './DefinitionList.jsx';
import { http } from './utils.js';

export default class Heteronym extends React.Component {
  render() {
    const {
      CurrentId,
      key,
      $char,
      H,
      LANG,
      english,
      id,
      auto_id=id,
      trs='',
      py,
      pinyin=py||trs||'',
      definitions=[],
      antonyms,
      synonyms,
      variants,
      specific_to,
      alt,
    } = this.props;
    let { title } = this.props;

    if (auto_id && LANG === 'h') {
      const re = /(.)\u20DE(\S+)/g;
      const pinyinList = [];
      let t;
      while (t = re.exec(pinyin)) {
        const variant = " 四海大平安南".indexOf(t[1]);
        const mp3 = http(`h.moedict.tw/${variant}-${audio_id}.ogg`);
        pinyinList.push(
          <span className="audioBlock">
            <div className="icon-play playAudio part-of-speech">
              <meta itemProp="name" content={mp3.replace(/^.*\//, '')} />
              <meta itemProp="contentURL" content={mp3} />
              {t[1]}
            </div>
          </span>
        );

        if (t[1] === '四') {
          // TODO: missing function convertPinyinH
          t[2] = convertPinyinH(t[2])
        }
        const __html = t[2]
          .replace(/¹/g, '<sup>1</sup>')
          .replace(/²/g, '<sup>2</sup>')
          .replace(/³/g, '<sup>3</sup>')
          .replace(/⁴/g, '<sup>4</sup>')
          .replace(/⁵/g, '<sup>5</sup>');
        pinyinList.push(
          <span dangerouslySetInnerHTML={{ __html }} />
        );
      }
    }

    if (!title.match(/</)) {
      title = `<div class="stroke" title="筆順動畫">${title}</div>`;
    }

    // TODO: missing function untag
    // TODO: missing function h
    const t = untag(h, title);

    // TODO: missing function decorateRuby
    const {
      ruby: titleRuby,
      youyin,
      bAlt,
      pAlt,
      cnSpecific,
      bopomofo,
      pinyin: _pinyin
    } = LANG === 'h' ? {} : decorateRuby(this.props);

    let list = [
      titleRuby
        ? <RightAngle html={h(titleRuby)} />
        : <span dangerouslySetInnerHTML={{ __html: title }} />
    ];
    if (youyin) {
      list.push(<small className="youyin">{youyin}</small>)
    }
    let mp3 = '';
    if (audio_id) {
      if (LANG === 't' && !(20000 < audio_id && audio_id < 50000)) {
        const basename = ((100000 + Number(audio_id)) + '').replace(/^1/, '');
        mp3 = http(`t.moedict.tw/${basename}.ogg`);
      } else if (LANG === 'a') {
        mp3 = http(`a.moedict.tw/${audio_id}.ogg`); // TODO: opus
      }
    }
    if (mp3) {
      list.push(
        <i
          itemType="http://schema.org/AudioObject"
          className="icon-play playAudio"
        >
          <meta itemProp="name" content={mp3.replace(/^.*\//, '')} />
          <meta itemProp="contentURL" content={mp3} />
        </i>
      );
    }
    if (bAlt) {
      if (localStorage && localStorage.gitItem(`pinyin_${LANG}`).match(/-/)) {
        // TODO: missing function convertPinyin
        list.push(
          <small className="alternative">
            <span className="pinyin">{pAlt}</span>
            <span className="bopomofo" style={{ margin: 0, padding: 0, parginTop: 4 }}>
              {bAlt}
            </span>
            <span className="pinyin">{convertPinyin(pAlt)}</span>
          </small>
        );
      } else {
        list.push(
          <small className="alternative">
            <span className="pinyin">{convertPinyin(pAlt)}</span>
            <span className="bopomofo">{bAlt}</span>
          </small>
        )
      }
    }
    if (english) {
      list.push(<span lang="en" className="english">{english}</span>);
    }
    if (specific_to) {
      list.push(<span className="specific_to" dangerouslySetInnerHTML={{ __html: h(specific_to) }} />);
    }

    return (
      <Inlined>
        <meta itemProp="image" content={encodeURIComponent(t) + '.png'} />
        <meta itemProp="name" content={t} />
        { (key || 0) === 0 &&
          <Star CurrentId={CurrentId} LANG={LANG} />
          /*
          <a
            style={{ color: 'white', cursor: 'pointer' }}
            className="part-of-speech"
            title="加入字詞記錄簿"
          >
            篆
          </a>
          <a
            style={{ color: 'white', cursor: 'pointer' }}
            className="part-of-speech"
            title="加入字詞記錄簿"
          >
            金
          </a>
          <a
            style={{ color: 'white', cursor: 'pointer' }}
            className="part-of-speech"
            title="加入字詞記錄簿"
          >
            隸
          </a>
          <a
            style={{ color: 'white', cursor: 'pointer' }}
            className="part-of-speech"
            title="加入字詞記錄簿"
          >
            草
          </a>
          <a
            style={{ color: 'white', cursor: 'pointer' }}
            className="part-of-speech"
            title="加入字詞記錄簿"
          >
            行
          </a>
          <a
            style={{ color: 'white', cursor: 'pointer' }}
            className="part-of-speech"
            title="加入字詞記錄簿"
          >
            楷
          </a>
          */
        }
        <a
          style={{ position: 'absolute', right: 41, top: 160, color: 'white', cursor: 'pointer', display: 'none' }}
          id="historical-scripts"
          className="hidden-xs part-of-speech"
          title="字體e筆書寫：張炳煌教授\n字體選用：郭晉銓博士"
          onClick={function() {
            $('#strokes iframe').remove();
            for (const ch of CurrentId) {
              $('#strokes').append($('<iframe />', {
                src: `https://www.moedict.tw/clk/searchclk/srch_history/main/${ encodeURIComponent(ch) }`,
                scrolling: 'no',
                css: {
                  width: 1400,
                  clear: 'both',
                  transform: 'scale(0.6)',
                  marginLeft: -290,
                  marginRight: -290,
                  height: 250,
                  marginTop: -50,
                  marginBottom: -50,
                  border: 0,
                }
              }));
            }
          }}
        >
          歷代書體
        </a>
        {$char}
        <h1 className="title" dataTitle={t}>{list}</h1>
        { (bopomofo || alt || pinyinList) &&
          <div className={`bopomofo ${cnSpecific}`}>
            { alt &&
              <div lang="zh-Hans" className="cn-specific">
                <span className="xref part-of-speech">简</span>
                <span className="xref">{untag(alt)}</span>
              </div>
            }
            { cnSpecific && _pinyin && bopomofo &&
              <small className="alternative cn-specific">
                <span className="pinyin">{convertPinyin(_pinyin)}</span>
                <span className="bopomofo">{bopomofo}</span>
              </small>
            }
            { pinyinList &&
              <span className="pinyin">{pinyinList}</span>
            }
          </div>
        }
        <div className="entry" itemProp="articleBody">
          { groupBy('type', definitions.slice()).map(function(defs, key) {
            return (
              <DefinitionList
                key={key}
                LANG={LANG}
                H={H}
                defs={defs}
                synonyms={synonyms}
                antonyms={antonyms}
                variants={variants}
              />
            );
          }) }
        </div>
      </Inlined>
    );
  }
}
