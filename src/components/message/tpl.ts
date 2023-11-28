const tpl = `
{{#if text}}
  <div class='message__text'>
    <p>{{text}}</p>
    <p class='message__time'>{{time}}</p>
  </div>
{{/if}}
{{#if file}}
  <div class='message__file'>
    <img src={{file}} class='message__img'/>
    <p class='message__time'>{{time}}</p>
  </div>
{{/if}}
`;

export default tpl;
