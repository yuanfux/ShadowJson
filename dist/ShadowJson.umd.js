!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){module.exports=function(){function t(t,e){if(this._o=t,this._s={},e)for(var i=0;i<e.length;i++){var s=this._f(t,e[i]);void 0!==s&&(this._s[e[i]]=this._dc(s))}}return t.prototype._pv=function(t){return!(null==t||""===t)},t.prototype._dc=function(t){return void 0!==t?JSON.parse(JSON.stringify(t)):void 0},t.prototype._f=function(t,e){e=this._pv(e)?e.split("."):e;for(var i=0;t&&i<e.length;i++)t=t[e[i]];return t},t.prototype._e=function(t,e,i){if(!this._pv(e))return!1;for(var s=(e=e.split(".")).length,o=0;o<s;o++){if(o===s-1)return void 0!==i?t[e[o]]=this._dc(i):delete t[e[o]],!0;if(null==t[e[o]]){if(void 0===i)return!1;t[e[o]]={}}t=t[e[o]]}},t.prototype.get=function(t){return this._pv(t)?this._s[t]:this._s},t.prototype.set=function(t,e){this._pv(t)&&(this._s[t]=this._dc(e))},t.prototype.commit=function(t){if(this._pv(t))this._s.hasOwnProperty(t)&&(this._e(this._o,t,this._s[t]),delete this._s[t]);else for(var e=0,i=Object.keys(this._s);e<i.length;e+=1){var s=i[e];this._e(this._o,s,this._s[s]),delete this._s[s]}},t.prototype.discard=function(t){if(this._pv(t))this._s.hasOwnProperty(t)&&delete this._s[t];else for(var e=0,i=Object.keys(this._s);e<i.length;e+=1){delete this._s[i[e]]}},t}()});