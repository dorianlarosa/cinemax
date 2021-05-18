import React, { Component } from "react";
import "./SearchBar.scss";
import { Formik, Field } from "formik";
import apiMovie, { apiMapData } from "../../../conf/api.movie";

import { ReactComponent as CloseIcon }from "../utils/close-icon.svg";

const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
  <input type="text" {...props} {...field} />
);



class SearchBar extends Component {

  submit = (values, actions) => {
    let inputValue;
    if (values.query) {
      inputValue = values.query;
    } else {
      inputValue = values.target.value;
    }

    if (
      (inputValue == "" && this.props.search == true) ||
      (inputValue != "" && this.props.search == false)
    ) {
      this.props.toggleSearch();
    }

    if (inputValue != "") {
     
        Promise.all([
          apiMovie.get(
            `/search/multi?query=${inputValue}&language=fr-FR&page=1`
          ),
          apiMovie.get(
            `/search/multi?query=${inputValue}&language=fr-FR&page=2`

          ),
          apiMovie.get(
            `/search/multi?query=${inputValue}&language=fr-FR&page=3`

          ),
          apiMovie.get(
            `/search/multi?query=${inputValue}&language=fr-FR&page=4`

          ),
        ])

          .then(([page1, page2, page3, page4]) => ({
            page1: page1.data.results,
            page2: page2.data.results,
            page3: page3.data.results,
            page4: page4.data.results,
          }))
          .then(({ page1, page2, page3, page4 }) => {
            // merge pages
            const allPages = [...page1, ...page2, ...page3, ...page4];

            const moviesDetails = allPages.filter(function(m) {
                  return m.poster_path;
                }).map(apiMapData);

            // 5. Set the state to our new copy
            this.props.updateSearchMovies(moviesDetails);
      });

     }
  };

  openSearchInput = (values, actions) => {
     values.target.classList.add('open');
  };

  closeSearchInput = () => {
    let searchField = document.getElementById('field-search');
    
    searchField.classList.remove('open');

    // @todo : page is reload with submit methode
    if(searchField.value != "") {
      searchField.value = "";
      document.getElementById('form').submit();
    }
   };


  render() {
    return (
      <Formik
        onSubmit={this.submit, this.props.closeMenuMobile}
        onChange={this.submit}
        initialValues={{ query: "" }}
        validate={this.submmit}
      >
        {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form className="search" id="form" onSubmit={handleSubmit}>
            <Field
              id="field-search"
              name="query"
              onKeyUp={this.submit}
              component={ComposantInput}
              onFocus={this.openSearchInput}
              onBlur={this.closeSearchInput}
            />
            <div className="symbol">
              <svg className="lens" viewBox="0 0 16 16">
                <path
                  d="M15.656,13.692l-3.257-3.229c2.087-3.079,1.261-7.252-1.845-9.321c-3.106-2.068-7.315-1.25-9.402,1.83
s-1.261,7.252,1.845,9.32c1.123,0.748,2.446,1.146,3.799,1.142c1.273-0.016,2.515-0.39,3.583-1.076l3.257,3.229
c0.531,0.541,1.404,0.553,1.95,0.025c0.009-0.008,0.018-0.017,0.026-0.025C16.112,15.059,16.131,14.242,15.656,13.692z M2.845,6.631
c0.023-2.188,1.832-3.942,4.039-3.918c2.206,0.024,3.976,1.816,3.951,4.004c-0.023,2.171-1.805,3.918-3.995,3.918
C4.622,10.623,2.833,8.831,2.845,6.631L2.845,6.631z"
                />
              </svg>
            </div>
            <CloseIcon onClick={this.closeSearchInput}/>
          </form>
        )}
      </Formik>
    );
  }
}

export default SearchBar;
