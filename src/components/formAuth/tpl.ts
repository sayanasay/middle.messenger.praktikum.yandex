const tpl = `
  <h2 class='form-auth__title'>{{form-name}}</h2>
  <div class='login-inputs'>
  {{{ inputs }}}
  </div>
  {{#if error}}
  <div class='form-auth__error'>{{error}}</div>
  {{/if}}
  {{{ button }}}
  {{{ link }}}
`;

export default tpl;
