const tpl = `
<div class='profile'>
  {{#if avatarImage}}
    {{{ avatarImage }}}
  {{/if}}
  <p class='profile__name'>{{ name }}</p>
  {{{ form }}}
  {{#if buttons}}
    <div class='profile__links'>
      {{{ editProfileBtn }}}
      {{{ editPasswordBtn }}}
      {{{ logout }}}
    </div>
  {{/if}}
</div>
`;

export default tpl;
