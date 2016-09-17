
var SipHash = (function() {
  'use strict';
  // private methods
  var _add = function(a, b) {
    var rl = a.l + b.l;
    var a2 = { h: a.h + b.h + (rl / 2 >>> 31) >>> 0, l: rl >>> 0 };
    a.h = a2.h; a.l = a2.l;
  };

  var _xor = function(a, b) {
    a.h ^= b.h; a.h >>>= 0;
    a.l ^= b.l; a.l >>>= 0;
  };

  var _rotl = function(a, n) {
    var a2 = {
      h: a.h << n | a.l >>> (32 - n),
      l: a.l << n | a.h >>> (32 - n)
    };
    a.h = a2.h; a.l = a2.l;
  };

  var _rotl32 = function(a) {
    var al = a.l;
    a.l = a.h; a.h = al;
  };

  var _compress = function(v0, v1, v2, v3) {
    _add(v0, v1);
    _add(v2, v3);
    _rotl(v1, 13);
    _rotl(v3, 16);
    _xor(v1, v0);
    _xor(v3, v2);
    _rotl32(v0);
    _add(v2, v1);
    _add(v0, v3);
    _rotl(v1, 17);
    _rotl(v3, 21);
    _xor(v1, v2);
    _xor(v3, v0);
    _rotl32(v2);
  };

  var _getInt = function(a, offset) {
    return a.charCodeAt(offset + 3) << 24 |
         a.charCodeAt(offset + 2) << 16 |
         a.charCodeAt(offset + 1) << 8 |
         a.charCodeAt(offset);
  };

  var sipHash = {};

  sipHash.hash = function(key, m) {
    var k0 = { h: key[1] >>> 0, l: key[0] >>> 0 };
    var k1 = { h: key[3] >>> 0, l: key[2] >>> 0 };
    var v0 = { h: k0.h, l: k0.l };
    var v1 = { h: k1.h, l: k1.l };
    var v2 = k0;
    var v3 = k1;
    var mi;
    var mp = 0;
    var ml = m.length;
    var ml7 = ml - 7;
    var buf = new Uint8Array(new ArrayBuffer(8));

    _xor(v0, { h: 0x736f6d65, l: 0x70736575 });
    _xor(v1, { h: 0x646f7261, l: 0x6e646f6d });
    _xor(v2, { h: 0x6c796765, l: 0x6e657261 });
    _xor(v3, { h: 0x74656462, l: 0x79746573 });
    
    while (mp < ml7) {
      mi = { h: _getInt(m, mp + 4), l: _getInt(m, mp) };
      _xor(v3, mi);
      _compress(v0, v1, v2, v3);
      _compress(v0, v1, v2, v3);
      _xor(v0, mi);
      mp += 8;
    }
    buf[7] = ml;
    var ic = 0;
    while (mp < ml) {
      buf[ic++] = m.charCodeAt(mp++);
    }
    while (ic < 7) {
      buf[ic++] = 0;
    }
    mi = { h: buf[7] << 24 | buf[6] << 16 | buf[5] << 8 | buf[4],
         l: buf[3] << 24 | buf[2] << 16 | buf[1] << 8 | buf[0] };
    _xor(v3, mi);
    _compress(v0, v1, v2, v3);
    _compress(v0, v1, v2, v3);
    _xor(v0, mi);
    _xor(v2, { h: 0, l: 0xff });
    _compress(v0, v1, v2, v3);
    _compress(v0, v1, v2, v3);
    _compress(v0, v1, v2, v3);
    _compress(v0, v1, v2, v3);

    var h = v0;
    _xor(h, v1);
    _xor(h, v2);
    _xor(h, v3);

    return h;
  };

  sipHash.string16ToKey = function(a) {
    return [_getInt(a, 0), _getInt(a, 4),
        _getInt(a, 8), _getInt(a, 12)];
  };

  sipHash.hashHex = function(key, m) {
    var r = hash(key, m);
    return ('0000000' + r.h.toString(16)).substr(-8) + ('0000000' + r.l.toString(16)).substr(-8);
  };

  sipHash.hashUint = function(key, m) {
    var r = hash(key, m);
    return (r.h & 0x1fffff) * 0x100000000 + r.l;
  };

  return sipHash;
})();

var module = module || { };
var exports = module.exports = SipHash;
