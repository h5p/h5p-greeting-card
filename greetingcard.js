var H5P = H5P || {};

H5P.GreetingCard = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id) {
    this.$ = $(this);
    // Extend defaults with provided options
    this.options = $.extend(true, {}, {
      greeting: 'Hello world!',
      image: null
    }, options);
    // Keep provided id.
    this.id = id;
    
if (this.options.task) {
  // Initialize task
  this.task = H5P.newRunnable(this.options.task, this.id);

  // Trigger resize events on the task:
  this.on('resize', function (event) {
    this.task.trigger('resize', event);
  });
}
  };

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
    $container.addClass("h5p-greetingcard");
    // Add image if provided.
    if (this.options.image && this.options.image.path) {
      $container.append('<img class="greeting-image" src="' + H5P.getPath(this.options.image.path, this.id) + '">');
    }
    // Add greeting text.
    $container.append('<div class="greeting-text">' + this.options.greeting + '</div>');
    
    if (this.task) {
      // Create a container for the task
      var $taskHolder = $('<div>');

      // Attach the task to the container
      this.task.attach($taskHolder);

      // Append the task container to our content types container
      $container.append($taskHolder);
    }
    
    // TODO - need to wait for image beeing loaded
    // For now using timer. Should wait for image is loaded...
    setTimeout(function () {
      self.$.trigger('resize');
    }, 1000);
  };

  return C;
})(H5P.jQuery);
