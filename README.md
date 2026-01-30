<!--

@license Apache-2.0

Copyright (c) 2022 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# Error Database

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Standard library error code database.



<section class="usage">

## Usage

```javascript
import database from 'https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-database@v0.4.0-esm/index.mjs';
```

#### database()

Returns a mapping of standard library error codes to their corresponding error messages.

```javascript
var db = database();
// returns {...}
```

</section>

<!-- /.usage -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="module">

import invertObject from 'https://cdn.jsdelivr.net/gh/stdlib-js/object-inverse@esm/index.mjs';
import replace from 'https://cdn.jsdelivr.net/gh/stdlib-js/string-replace@esm/index.mjs';
import database from 'https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-database@v0.4.0-esm/index.mjs';

var db = database();
var errorMap = invertObject( db );
var RE_ERR_MSG = /Error\( '([^']+)' \)/;

function replacer( match, p1 ) {
    return 'Error( formatProdErrorMessage( \'' + errorMap[ p1 ] + '\' ) )';
}

var code = 'throw new Error( \'insufficient input arguments. Must provide at least one iterator function.\' );';
var transformed = replace( code, RE_ERR_MSG, replacer );
// returns 'throw new Error( formatProdErrorMessage( \'04\' ) );'

</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- <license> -->

## License

The data files (databases) are licensed under an [Open Data Commons Public Domain Dedication & License 1.0][pddl-1.0] and their contents are licensed under [Creative Commons Zero v1.0 Universal][cc0]. The software is licensed under [Apache License, Version 2.0][apache-license].

<!-- </license> -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## Copyright

Copyright &copy; 2016-2026. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/error-tools-database.svg
[npm-url]: https://npmjs.org/package/@stdlib/error-tools-database

[test-image]: https://github.com/stdlib-js/error-tools-database/actions/workflows/test.yml/badge.svg?branch=v0.4.0
[test-url]: https://github.com/stdlib-js/error-tools-database/actions/workflows/test.yml?query=branch:v0.4.0

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/error-tools-database/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/error-tools-database?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/error-tools-database.svg
[dependencies-url]: https://david-dm.org/stdlib-js/error-tools-database/main

-->

[chat-image]: https://img.shields.io/badge/zulip-join_chat-brightgreen.svg
[chat-url]: https://stdlib.zulipchat.com

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/error-tools-database/tree/deno
[deno-readme]: https://github.com/stdlib-js/error-tools-database/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/error-tools-database/tree/umd
[umd-readme]: https://github.com/stdlib-js/error-tools-database/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/error-tools-database/tree/esm
[esm-readme]: https://github.com/stdlib-js/error-tools-database/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/error-tools-database/blob/main/branches.md

[pddl-1.0]: http://opendatacommons.org/licenses/pddl/1.0/

[cc0]: https://creativecommons.org/publicdomain/zero/1.0

[apache-license]: https://www.apache.org/licenses/LICENSE-2.0

<!-- <related-links> -->

<!-- </related-links> -->

</section>

<!-- /.links -->
