const tpl = `
{{{ avatar }}}
<p class='profile__name'>Dow</p>
<form class='profile__form'>
  {{{ inputs }}}
  {{#if button}}
    <div class='profile__button'>
      {{{ button }}}
    </div>
  {{/if}}
</form>
{{#if buttons}}
  <div class='profile__links'>
    <a href='/profile-edit' class='profile__link' data-nav='/profile-edit'>Изменить данные</a>
    <a href='/edit-password' class='profile__link' data-nav='/edit-password'>Изменить пароль</a>
    <a href='/' class='profile__link profile__link--red' data-nav='/'>Выйти</a>
  </div>
{{/if}}
`;

export default tpl;
