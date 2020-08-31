$('.list-preload').css({display: 'flex'});

$(document).ready(function(){

  $('.list-preload').css({display: 'none'});

  $('.open-new-users-modal').click(function(){
    $('.new-users-modal').css({display: 'flex'});
  });

  $('#totalRows').text($('.row').length);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      var db = firebase.firestore();
      var userRef = db.collection("users");

      $('#sortUsers').click(function(){
        userRef.orderBy("firstname").get().then(snapshot => {
          $(".row").sort(sortAsc).appendTo('.items__container'); 
        });
      });
      $('#sortLocation').click(function(){
        userRef.orderBy("locationName").get().then(snapshot => {
          $(".row").sort(sortAsc).appendTo('.items__container'); 
        });
      });

      db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {


          var dateString = doc.data().createdDate.toDate();
          dateString = new Date(dateString).toUTCString();
          dateString = dateString.split(' ').slice(0, 4).join(' ');
          
          console.log(doc.id, " => ", doc.data());
          $('.items__container').append(
            `<div class="row">
               <a href="#" class="block-link w-inline-block">
                 <div class="row-block long">
                   <div class="row-icon-wrapper radius">
                     <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f03401e70969365f89c6999_profile%20pic.png" srcset="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f03401e70969365f89c6999_profile%20pic-p-500.png 500w, https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f03401e70969365f89c6999_profile%20pic.png 750w" sizes="35.989585876464844px" alt="">
                   </div>
                   <div>
                     <div class="align-row">
                       <div class="name-label user-name">${doc.data().firstName} ${doc.data().lastName}</div>
                       <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ecee547cffdee66e029f4_crown.svg" alt="" class="user-admin">
                     </div>
                     <div class="sub-label user-email">${doc.data().email}</div>
                   </div>
                  </div>
                </a>
                <div class="row-block last">
                  <div class="user-location">${doc.data().locationName}</div>
                </div>
                <div class="row-block last">
                  <div class="user-region">${doc.data().region}</div>
                </div>
                <div class="row-block last">
                  <div class="user-role">${doc.data().employeeRole}</div>
                </div>
                <div class="row-block last">
                  <div class="user-status">Pending</div>
                </div>
                <div class="row-block last">
                  <div class="user-created">${dateString}</div>
                </div>
                <div class="row-block last">
                  <div class="user-access">${dateString}</div>
                </div>
                <div class="row-block last">
                  <div data-hover="" data-delay="0" class="row-dropdown w-dropdown">
                <div class="row-dropdown-toggle w-dropdown-toggle" role="button">
                  <div class="row-dropdown-dot">
                </div>
                <div class="row-dropdown-dot">
                  </div><div class="row-dropdown-dot last"></div>
                </div>
                <nav class="row-dropdown-list w-dropdown-list">
                  <a href="#" class="row-dropdown-link open-edit-user-modal w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Edit User</div>
                  </a>
                  <a href="#" class="row-dropdown-link w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Resend Invite Email</div>
                  </a>
                  <a href="#" class="row-dropdown-link w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Copy Invite Link</div>
                  </a>
                  <a href="#" class="row-dropdown-link w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Delete Invite</div>
                  </a>
                </nav>
              </div>
            </div>
          </div>`
          );
        });
      });

      $('#createNewUser').click(function(e){

        var firstName = $('#newUserFirstName').val();
        var lastName = $('#newUserLastName').val();
        var email = $('#newUserEmail').val();
        var location = $('#newUserLocation').val();
        var region = $('#newUserRegion').find(':selected').text();
        var role = $('#newUserRole').find(':selected').text();
        var admin = $('#newUserAdmin').find(':selected').text();
        var createDate = new Date();
      
        e.preventDefault();

        userRef.add({
          firstName: firstName,
          lastName: lastName,
          email: email,
          locationName: location,
          region: region,
          employeeRole: role,
          admin: admin,
          createdDate: createDate
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);

          $('.new-users-modal').css({display: 'none'});
          $('.items__container').append(
            `<div class="row">
               <a href="#" class="block-link w-inline-block">
                 <div class="row-block long">
                   <div class="row-icon-wrapper radius">
                     <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f03401e70969365f89c6999_profile%20pic.png" srcset="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f03401e70969365f89c6999_profile%20pic-p-500.png 500w, https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f03401e70969365f89c6999_profile%20pic.png 750w" sizes="35.989585876464844px" alt="">
                   </div>
                   <div>
                     <div class="align-row">
                       <div class="name-label user-name">${firstName} ${lastName}</div>
                       <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ecee547cffdee66e029f4_crown.svg" alt="" class="user-admin">
                     </div>
                     <div class="sub-label user-email">${email}</div>
                   </div>
                  </div>
                </a>
                <div class="row-block last">
                  <div class="user-location">${location}</div>
                </div>
                <div class="row-block last">
                  <div class="user-region">${region}</div>
                </div>
                <div class="row-block last">
                  <div class="user-role">${role}</div>
                </div>
                <div class="row-block last">
                  <div class="user-status">Pending</div>
                </div>
                <div class="row-block last">
                  <div class="user-created">${createDate}</div>
                </div>
                <div class="row-block last">
                  <div class="user-access">${createDate}</div>
                </div>
                <div class="row-block last">
                  <div data-hover="" data-delay="0" class="row-dropdown w-dropdown">
                <div class="row-dropdown-toggle w-dropdown-toggle" role="button">
                  <div class="row-dropdown-dot">
                </div>
                <div class="row-dropdown-dot">
                  </div><div class="row-dropdown-dot last"></div>
                </div>
                <nav class="row-dropdown-list w-dropdown-list">
                  <a href="#" class="row-dropdown-link open-edit-user-modal w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Edit User</div>
                  </a>
                  <a href="#" class="row-dropdown-link w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Resend Invite Email</div>
                  </a>
                  <a href="#" class="row-dropdown-link w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Copy Invite Link</div>
                  </a>
                  <a href="#" class="row-dropdown-link w-inline-block">
                    <img src="https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f3ebbf38ee3ae0b4d04b85a_user%20(9).svg" loading="lazy" alt="" class="row-dropdown-icon">
                    <div>Delete Invite</div>
                  </a>
                </nav>
              </div>
            </div>
          </div>`
          );
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });  
      });

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
   });
});


$(document).on('click', '.row-dropdown-toggle', function(){
  $(this).parents('.row-dropdown').css({'z-index': '901'});
  $(this).addClass('w--open');
  $(this).siblings('.row-dropdown-list').addClass('w--open');
}, function(){
  $(this).parents('.row-dropdown').css({'z-index': '0'});
  $(this).removeClass('w--open');
  $(this).siblings('.row-dropdown-list').removeClass('w--open');
});

function sortAsc(a, b) { 
  return ($(b).text().toUpperCase()) <  
    ($(a).text().toUpperCase()) ? 1 : -1;  
} 
