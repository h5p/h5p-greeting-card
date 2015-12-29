'use strict';

var H5P = H5P || {};

H5P.GreetingCard = (function () {
  /**
   * Constructor function.
   * @param {String} [options.greeting] Greeting text
   * @param {Object} [options.image] Greeting image
   */
  function C(options, id) {
    // Set params
    this.options = options;
    // Keep provided id.
    this.id = id;
  }

  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    var self = this;
    // Set class on container to identify it as a greeting card
    // container.  Allows for styling later.
    var Image = React.createClass({
      displayName: 'Image',

      render: function render() {
        if (this.props.options.image.path && this.props.id) {
          return React.createElement('img', {
            'className': 'greeting-image',
            'src': H5P.getPath(this.props.options.image.path, this.props.id)
          });
        }
        return false;
      }
    });

    var GreetingCard = React.createClass({
      displayName: 'GreetingCard',

      render: function render() {
        return React.createElement(
          'div',
          { 'className': 'h5p-greetingcard' },
          React.createElement(Image, this.props),
          React.createElement(
            'div',
            { 'className': 'greeting-text' },
            this.props.options.greeting
          )
        );
      }
    });

    // Add image if provided.
    ReactDOM.render(React.createElement(GreetingCard, {options: self.options, id: self.id}), $container.get(0));

    // TODO - need to wait for image beeing loaded
    // For now using timer. Should wait for image is loaded...
    setTimeout(function () {
      self.$.trigger('resize');
    }, 1000);
  };

  return C;
})();
