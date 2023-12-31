const tpl = `
  <label class='input__label' for='{{id}}'>{{label}}</label>
  <input
    class='input__field'
    type='{{type}}'
    name='{{name}}'
    id='{{id}}'
    placeholder='{{placeholder}}'
    value='{{value}}'
  />
  {{#if error}}
    <div class='input__error'>{{error}}</div>
  {{/if}}
`;

export default tpl;
