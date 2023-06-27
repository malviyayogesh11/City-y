$(document).ready(function() {
    $('#cityInput').keyup(function() {
        var query = $(this).val();
        if (query !== '') {
            $.ajax({
                url: 'data.json', // Assuming you have the JSON data in a file named data.json
                dataType: 'json',
                success: function(data) {
                    var matches = [];
                    $.each(data, function(index, city) {
                        if (city.name.toLowerCase().includes(query.toLowerCase())) {
                            matches.push(city);
                        }
                    });
                    displayDropdown(matches);
                }
            });
        } else {
            $('#dropdown').empty();
        }
    });

    function displayDropdown(matches) {
        var dropdown = $('#dropdown');
        dropdown.empty();
        if (matches.length > 0) {
            $.each(matches, function(index, city) {
                var option = $('<div>').text(city.name).addClass('dropdown-option');
                option.click(function() {
                    displayCityInfo(city);
                });
                dropdown.append(option);
            });
        } else {
            dropdown.append($('<div>').text('No matching cities found').addClass('dropdown-option'));
        }
    }

    function displayCityInfo(city) {
        var cityInfo = $('#cityInfo');
        cityInfo.empty();
        var info = $('<div>').addClass('city-info');
        info.append($('<p>').text('Rank: ' + city.rank));
        info.append($('<p>').text('City Population (2011): ' + city.population2011));
        info.append($('<p>').text('Population (2001): ' + city.population2001));
        info.append($('<p>').text('State or Union Territory: ' + city.state));
        cityInfo.append(info);
    }
});
