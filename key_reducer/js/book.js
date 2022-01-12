let keywords = document.querySelectorAll('.elementor-post-info__terms-list a');
let non_visible_keywords = [];

if (keywords.length > 10) {
  non_visible_keywords = Array.from(keywords).slice(10, keywords.length);
  non_visible_keywords.forEach(keyword => {
    keyword.style.display = 'none';
  });
}

let key_overview_section = document.querySelector('.keyword-overview-section');

if(keywords.length < 1 && key_overview_section != null){
  console.log("here i am");
  key_overview_section.style.display = 'none';
}
