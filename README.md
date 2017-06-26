# Highlighter-JS

A simple, small, fast, multilingual text highlighter in javascript.

### How To use / Install

Download highlighter.min.js, place it in the same directory (folder) as your HTML file, and put this into your head (or somewhere before your code that uses it).
```Html
<script src="highlighter.min.js"></script>
```

Then, highlighter JS will set `window.highlighttext` to the highlighting function it creates.

### Documentation

So, here is how to use highlighter JS.
```Javascript
highlighttext(textToHighlight, stylesToApply, dontwraparound, saferCharCode);
```
 * __textToHighlight__
   *  The plain text you want to be highlighted. Must be a string or something convertertable to a string.
     *   Example: `'I am A String'`
 * __stylesToApply__
   *   An object that specifices the styles you want to apply. The format of this is the key is the style to be applied and the contents at that point are an array of `[start, end]` postion arrays. The highlight begins at the begining of the `start` position, and end at the end of the `end` position:

*Persuado-visual-depiction:*
```Javascript
stylesToApply = {
    'CSS_style': [
        [start_pos1, end_pos1],
        [start_pos2, end_pos2]
        // etc...
    ],
    'CSS_style_2nd': [
        [start_pos1, end_pos1],
        [start_pos2, end_pos2]
        // etc...
    ]
    // etc...
};
```
*Example:*
```Javascript
{
    'background:yellow': [
        [0, 9]
    ],
    'background:pink': [
        [11, 21]
    ]
}
```
   *  *OR*, if you only want the classical yellow highlighter, then you can just pass an array of `[start, end]` positions like so:

*Persuado-visual-depiction:*
```Javascript
stylesToApply = [
    [start_pos1, end_pos1],
    [start_pos2, end_pos2]
    // etc...
];
/* Exactly Equivelent to:
{
    'background:yellow': [
        [start_pos1, end_pos1],
        [start_pos2, end_pos2]
        // etc...
    ]
};
*/
```
*Example:*
```Javascript
[
    [0, 9],
    [11, 21]
]
```
 * __dontwraparound__
   *  By default, highlighter JS acts sort of like `String.slice` where negative values are wraped around to the end. Enabling this behavior ensures that there will be no errors or unexpected results, however it is less efficient than no checks. To disable theese checks to increase performance, just pass `true` to dontwraparound.
   *  This paragraph concerns the technical details of the wrapping-around behavior. uses the following formula to wrap the start and end positions around the length of the string (because REALLY messed up things happen when values are out of range): `(textToHighlight.length + (current_value % textToHighlight.length)) % textToHighlight.length`. Then it switches the start position with the end position if the start position is higher than the end position. However, no need to fret: in the actual code, the length is not used so ineffciently.
   
 * __saferCharCode__
   *  Because some browsers use UCS-2 (as opposed to unicode) in javascript strings, some higher characters (like emoji's and asian characters) are incorrectly represented as two characters in a javascript string. This can make `[].slice.call(string)` return incorrect values with some of those higher characters represented as two seperate indexes. To solve this problem pass `true` for saferCharCode. saferCharCode causes `Array.from` to be used, so it will not work in IE unless you polyfill it.

Example:
```Javascript
   highlighttext('😒😎', {
	'background:yellow': [
		[0,0]
    ],
	'background:pink': [
		[1,1]
    ]
})
```
Might incorrectly output: `<span style="background:yellow">�</span><span style="background:pink">�</span>😎`
However, with the saferCharCode parameter, it will always work fine:
```Javascript
   highlighttext('😒😎', {
	'background:yellow': [
		[0,0]
    ],
	'background:pink': [
		[1,1]
    ]
}, false /*dontwraparound*/, true /*saferCharCode*/);
```
Will always output: `<span style="background:yellow">😒</span><span style="background:pink">😎</span>`


### Example

Javascirpt code:
```Javascript
highlight('javascript programming', {
    'background:yellow;color:red': [
	[0,10]
    ],
    'background:pink': [
	[14,-5]
    ],
    'font-style:italics;font-weight:bold': [
	[-2,-3]
    ]
})
```
Result:
```Html
<span style="background:yellow;color:red">javascript </span>pro<span style="background:pink">gram</span>m<span style="font-style:italics;font-weight:bold">in</span>g
```




