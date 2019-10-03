document.addEventListener('DOMContentLoaded', function() {
    //add subscription key
    const subscriptionKey = 'XXXXXXXXXXX'
    var searchButton = document.getElementById('search');
    var desiredLanguage = document.querySelector('.language');
    var queryInput = document.getElementById('query');
    var getTranslation = function(textInput, languageOutput){
      baseUrl = 'https://api.cognitive.microsofttranslator.com'
      path = '/translate?api-version=3.0'
      params = '&to=' + languageOutput
      constructedUrl = baseUrl + path + params

      headers = {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-type': 'application/json',
          'X-ClientTraceId': 'placeholder'
      }

      body = [{
          'text' : textInput
      }]
      response = requests.post(constructedUrl, headers=headers, json=body)
      let j = response.json();
      return j['translations'][0]['text']
    }

    searchButton.addEventListener('click', function() {
        d = document;
        var f = d.createElement('form');
        f.action = 'https://api.cognitive.microsofttranslator.com/detect';
        f.method = 'post';
        var i = d.createElement('input');
        i.value = queryInput;
        f.appendChild(i);
        d.body.appendChild(f);
        let selectedLanguage = desiredLanguage.querySelector('option[selected]').setAttribute('value');
        let translated = getTranslation(i.value, selectedLanguage)
       
        newUrl = 'http://www.google.com/search?q='+translated.split(' ').join('+')
        window.location.href = newUrl
      });

    desiredLanguage.addEventListener('change', (event) => {
      desiredLanguage.querySelector('option[selected]').removeAttribute('selected');
      let selectedLanguage = event['target']['value'];
      desiredLanguage.querySelector(`option[value=${selectedLanguage}]`).setAttribute('selected', '');
      desiredLanguage.text = selectedLanguage;

    })
    }, false);
  