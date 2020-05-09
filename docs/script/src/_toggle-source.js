class ToggleSource {

  constructor (options) {
    this.TRIGGER = document.querySelector(options.trigger);
    this.TARGETS = document.querySelectorAll(options.targets);
    this.CODEHOLDERS = [];
    this._init();
  }

  _init () {
    this._addCodeMirrorOnTargets();
    this._addTriggerClickListener();
  }

  _addCodeMirrorOnTargets () {
    this.TARGETS.forEach(el => {
      
      const holder = document.createElement('div');
      holder.classList.add('el-ac-code-preview');
      el.insertAdjacentElement('afterend', holder);
      
      const code = document.createElement('textarea');
      code.value = el.innerHTML;
      holder.append(code);
      const CM = this._textareaToCodeMirror(code);
      
      this.CODEHOLDERS.push({$el: holder, $cm: CM});
    });
  }

  _addTriggerClickListener () {
    this.TRIGGER.addEventListener('click', e => {
      e.preventDefault();
      e.target.classList.toggle('active');
      this.CODEHOLDERS.forEach(holder => {
        holder.$el.classList.toggle('visible')
        holder.$cm.refresh();
      });
    });
  }

  _textareaToCodeMirror(textarea) {
    const CM = CodeMirror.fromTextArea(textarea, {
      mode: 'htmlmixed',
      readOnly: true,
      htmlMode: true,
      lineNumbers: true
    });
    CM.setSize("100%", "100%");
    CM.setValue(textarea.value);   
    return CM;
  }
}