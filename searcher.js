
var query = location.hash ? location.hash.substr(1) : '%s';

window.searchs =
[
  {
    name: 'Exvagos',
    url: 'http://exvagos.com/search.php?do=process&titleonly=1&forumchoice[]=294&forumchoice[]=26&forumchoice[]=478&childforums=1&query=' + query
  },
  {
    name: 'HdMax',
    url: 'http://www.hdmax.li/search.php?sc=1&sf=titleonly&sr=topics&keywords=' + query
  },
  {
    name: 'quebajamos',
    url: 'http://www.quebajamos.li/search.php?do=process&titleonly=1&query=' + query
  },
  {
    name: 'todohdtv',
    url: 'http://foro.todohdtv.com/search.php?terms=all&author=&sc=1&sf=titleonly&sk=t&sd=d&sr=topics&st=0&ch=300&t=0&submit=Buscar&keywords=' + query
  },
  {
    name: 'solohdnet46',
    url: 'http://solohdnet46.net/index.php?action=search2',
    target: '_new', // This site has x-frame-options enabled
    parameters:
    {
      advanced: 1,
      search: query,
      searchtype: 1, // Coincidir todas las palabras
      userspec: '*',
      sort: 'relevance|desc',
      subject_only: 1,
      minage: 0,
      maxage: 9999/*,
      'brd[3]': 3,
      'brd[40]': 40,
      'brd[41]': 41,
      'brd[33]': 33,
      'brd[7]': 7,
      'brd[8]': 8,
      'brd[9]': 9,
      'brd[10]': 10,
      'brd[11]': 11,
      'brd[20]': 20,
      'brd[32]': 32,
      'brd[19]': 19*/
      /*submit: 'Buscar'*/
    }
  }
];

var Searcher =
{

  start: function()
  {
    jQuery( 'body' ).append( this._get_tabs_html() );
  },

  _get_tabs_html: function()
  {
    var tabs = [];
    var contents = [];

    for( var i = 0; i < window.searchs.length; i++ )
    {
      var item = window.searchs[ i ];

      if( !item.target )
      {
        tabs.push( '<li><a href="#tabs-' + i + '">' + item.name + '</a></li>' );
        contents.push( '<div id="tabs-' + i + '"><iframe name="iframe-' + i + '" style="width: 100%; height: 80%;" src="' + item.url + '"></iframe></div>' );
      }

      if( item.parameters )
      {
        var target = item.target || 'iframe-' + i;
        var form = '<form name="form-' + i + '" action="' + item.url + '" method="POST" target="' + target + '">';

        jQuery.each( item.parameters, function( key, value )
        {
          form += '<input type="hidden" name="' + key + '" value="' + value + '">';
        });

        form += '</form><script> document.forms[ "form-' + i + '" ].submit();</script>';
        contents.push( form );
      }
    }

    var html =
      '<div id="tabs">' +
        '<ul>' + tabs.join( '' ) + '</ul>' +
        contents.join( '' ) +
      '</div>' +
      '<script> jQuery( "#tabs" ).tabs(); </script>';

    return html;
  }

};
