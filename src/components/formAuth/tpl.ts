const tpl = `
  <h2 class='form-auth__title'>{{form-name}}</h2>
  <div class='login-inputs'>
  {{{ inputs }}}
  </div>
  {{{ button }}}
  <a class='form-auth__link' href={{link}} data-nav={{link}}>{{link-text}}</a>
`;

export default tpl;
