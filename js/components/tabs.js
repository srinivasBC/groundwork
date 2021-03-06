(function() {
  $(function() {
    var adjustVerticalTabs, convertToAccordion, restoreTabStructure, transformTabs;
    $('.tabs').each(function() {
      var activeTab, tabs;
      activeTab = $(this).children('ul').children('li.active');
      if (activeTab.length) {
        tabs = activeTab.parents('.tabs');
        return tabs.find(activeTab.attr('aria-controls')).addClass('active');
      } else {
        $(this).children('ul').children('li').first().addClass('active');
        return $(this).children('div').first().addClass('active');
      }
    });
    $('body').on('click', '.tabs > ul li', function(e) {
      var tab, tabs;
      tab = $(this).addClass('active');
      tabs = tab.parents('.tabs');
      tab.siblings('li').removeClass('active');
      tabs.find('> div, > ul > div').hide();
      tabs.find(tab.attr('aria-controls')).show();
      return e.preventDefault();
    });
    transformTabs = function() {
      var viewport;
      viewport = $(window).width();
      if (viewport <= 480) {
        restoreTabStructure('.tabs.accordion.mobile');
        return convertToAccordion('.tabs:not(.accordion):not(.mobile)');
      } else if (viewport < 768) {
        restoreTabStructure('.tabs.accordion.mobile, .tabs.accordion.small-tablet');
        return convertToAccordion('.tabs:not(.accordion):not(.mobile):not(.small-tablet)');
      } else if (viewport <= 1024) {
        restoreTabStructure('.tabs.accordion.mobile, .tabs.accordion.small-tablet, .tabs.accordion.ipad');
        return convertToAccordion('.tabs:not(.accordion):not(.mobile):not(.small-tablet):not(.ipad)');
      } else if (viewport > 1024) {
        return restoreTabStructure('.tabs.accordion');
      }
    };
    convertToAccordion = function(tabTypes) {
      tabTypes = $(tabTypes);
      return tabTypes.each(function() {
        var tabs;
        tabs = $(this);
        tabs.addClass('accordion');
        return tabs.find('> div').each(function() {
          var tabpanel;
          tabpanel = $(this).clone();
          tabs.find('li[aria-controls="#' + tabpanel.attr('id') + '"]').after(tabpanel);
          return $(this).remove();
        });
      });
    };
    restoreTabStructure = function(tabTypes) {
      return $(tabTypes).each(function() {
        var tabs;
        tabs = $(this);
        tabs.removeClass('accordion');
        if (tabs.hasClass('vertical')) {
          adjustVerticalTabs(tabs);
        }
        return tabs.children('ul').children('div').each(function() {
          var tabpanel;
          tabpanel = $(this).clone();
          tabs.append(tabpanel);
          return $(this).remove();
        });
      });
    };
    adjustVerticalTabs = function(tabs) {
      tabs = $(tabs);
      if (!tabs.length) {
        tabs = $('.tabs.vertical');
      }
      return tabs.each(function() {
        if ($(this).hasClass('vertical')) {
          $(this).children('ul').css({
            'min-height': '0px'
          });
          if (!$(this).hasClass('accordion')) {
            $(this).children('[role="tabpanel"]').css({
              'padding-left': $(this).children('ul').width() + 10 + 'px'
            });
            return $(this).children('ul').css({
              'min-height': $(this).height() + 'px'
            });
          }
        }
      });
    };
    $(window).resize(function() {
      clearTimeout(window.delayedAdjustTabs);
      return window.delayedAdjustTabs = setTimeout(function() {
        transformTabs();
        return adjustVerticalTabs();
      }, 50);
    });
    return $(window).load(function() {
      transformTabs();
      return adjustVerticalTabs();
    });
  });

}).call(this);
