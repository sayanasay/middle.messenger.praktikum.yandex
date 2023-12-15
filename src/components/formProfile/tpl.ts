const tpl = `
  {{{ inputs }}}
  <div class='profile__error'>{{ error }}</div>
  {{#if button}}
    <div class='profile__button'>
      {{{ button }}}
    </div>
  {{/if}}
`;

export default tpl;
