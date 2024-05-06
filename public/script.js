// script.js
// document.addEventListener('DOMContentLoaded', function() {
//   const form = document.getElementById('travelForm');
$(document).ready(function() {
  $('#travelForm').on('submit', function(e) {
      e.preventDefault(); // Prevent form submission
  $('#submitBtn').prop('disabled', true).text('Recommendations loading...');
  $('#loadingText').show();

  const desiredDestination = document.getElementById('desiredDestination').value;
  const travelDates = document.getElementById('travelDates').value;
  const travelDateFlexibility = document.getElementById('travelDateFlexibility').value;
  const travelCountryFlexibility = document.getElementById('travelCountryFlexibility').value;

  const countryOfResidence = document.getElementById('countryOfResidence').value;
  const tripDuration = parseInt(document.getElementById('tripDuration').value);
  const currency = document.getElementById('currency').value;

  const budget = document.getElementById('budgetRange').value
  let [min, max] = budget.split('-');

  if (min) {
    min = parseInt(min.trim());
  } else {
    min = 2000
  }

  if (max) {
    max = parseInt(max.trim());
  } else {
    max = 2500
  }

  const accommodationType = document.getElementById('accommodationType').value;
  const accommodationAmenitiesCheckboxes = document.querySelectorAll('input[name="accommodationAmenities"]:checked');
  const accommodationAmenities = Array.from(accommodationAmenitiesCheckboxes).map(checkbox => checkbox.value);
  const companionType = document.getElementById('companionType').value;;
  const numberOfChildren = document.getElementById('numberOfChildren').value;
  const specialNeeds = document.getElementById('specialNeeds').value;
  const activities = document.getElementById('activitiesInterestedIn').value.split();
  const activitiesInterestedIn = activities?.length > 0 ? activities : [];
  const landMarks = document.getElementById('specificLandmarks').value.split();
  const specificLandmarks = landMarks?.length > 0 ? landMarks : [];
  const activityVsRelaxationTime = document.getElementById('activityVsRelaxationTime').value;

  const preferredTrans = document.querySelectorAll('input[name="preferredTransportation"]:checked');
  const preferredTransportation = Array.from(preferredTrans).map(checkbox => checkbox.value);
  const foodTypePreference = document.getElementById('mealPreference').value;
  const specificDietary = document.getElementById('specificDietaryNeeds').value.split();
  const specificDietaryNeeds = specificDietary?.length > 0 ? specificDietary : [];
  const destinationType = document.getElementById('destinationType').value;
  const preferLocal = document.getElementById('preferLocal').checked;
  const interestedInCulturalActivities = document.getElementById('interestedInCulturalActivities').checked;
  const internetConnectivityImportance = document.getElementById('internetConnectivityImportance').checked;
  const sustainabilityImportance = document.getElementById('sustainabilityImportance').checked;
  const culturalImmersionInterest = document.getElementById('culturalImmersionInterest').checked;
  const specificRequirements = document.getElementById('specificRequirements').value;
  const safetyConcerns = document.getElementById('safetyConcerns').value;
  const healthConcerns = document.getElementById('healthConcerns').value;
  const healthcareAccessLevel = document.getElementById('healthcareAccessLevel').value;
  const programs = document.getElementById('loyaltyPrograms').value.split();
  const loyaltyPrograms = programs?.length > 0 ? programs : [];
  const languages = document.getElementById('languagePreferences').value.split();
  const languagePreferences = languages?.length > 0 ? languages : [];
  const continentalPreferences = Array.from(document.querySelectorAll('input[name="continentalPreferences"]:checked')).map(input => input.value);

  const formData = {
      basicInformation: {
          desiredDestination,
          travelDates,
          travelDateFlexibility,
          travelCountryFlexibility,
          countryOfResidence,
          tripDuration
      },
      budgetAndAccommodation: {
          budgetRange: [min, max],
          accommodationType,
          accommodationAmenities,
          currency
      },
      travelCompanions: {
          companionType,
          numberOfChildren,
          specialNeeds
      },
      activitiesAndInterests: {
          activitiesInterestedIn,
          specificLandmarks,
          activityVsRelaxationTime
      },
      travelPreferences: {
          preferredTransportation,
          mealPreference: {
              foodTypePreference,
              specificDietaryNeeds
          },
          destinationType,
          culturalPreferences: {
              preferLocal,
              interestedInCulturalActivities,
              continentalPreferences
          }
      },
      healthAndSafety: {
          healthConcerns,
          healthcareAccessLevel,
          safetyConcerns
      },
      environmentalAndCultural: {
          sustainabilityImportance,
          culturalImmersionInterest,
          languagePreferences
      },
      miscellaneous: {
          internetConnectivityImportance,
          loyaltyPrograms,
          specificRequirements
      }
  };

  $.ajax({
    url: '/travel-suggestions',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
        $('.recommendations-section').html(response);
        $('#submitBtn').prop('disabled', false).text('Get my recommendations');
        $('#loadingText').hide();
    },
    error: function(xhr, status, error) {
      console.error("Error: " + status + " " + error);
      $('.recommendations-section').html('<p>Error retrieving data. Please try again later.</p>');
      $('#submitBtn').prop('disabled', false).text('Get my recommendations');
      $('#loadingText').hide();
  }
});
  });
});
