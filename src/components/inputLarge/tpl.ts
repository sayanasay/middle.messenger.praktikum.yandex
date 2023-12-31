const tpl = `
<span class='input-large__label'>{{label}}</span>
<input
  class='input-large__field'
  type='{{type}}'
  name='{{name}}'
  id='{{id}}'
  placeholder='{{placeholder}}'
  value='{{value}}'
  {{#readonly}} readonly{{/readonly}}
/>
{{#if error}}
  <div class='input-large__error'>{{error}}</div>
{{/if}}
`;

export default tpl;
