import React from 'react'
class CharacterList extends React.Component {
    constructor(props) {
      super(props);
      this.switchPage = this.switchPage.bind(this);
      this.state = {
        error: null,
        isLoaded: false,
        pageNumber:1,
        NumberOfPages:null,
        modalToggled:null,
        items: []
      };
    }
    

    fetchMethod(url){
      const requestHeaders = new Headers();
      const requestParams = { method: 'GET',
      headers: requestHeaders,
      mode: 'cors',
      cache: 'default' };
      const selectedUrl =  url ? url :"https://rickandmortyapi.com/api/character";
      fetch( selectedUrl ,requestParams)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            NumberOfPages:result.info.pages
          });
          console.log(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    researchCharacter(e){
      const searchUrl = "https://rickandmortyapi.com/api/character/?name=" + e
      this.fetchMethod(searchUrl)
    }
    switchPage(url){
      this.fetchMethod(url)
    }
    modalToggled(id){
      const characterUrl= "https://rickandmortyapi.com/api/character/" + id
      this.fetchMethod(characterUrl)
    }
    
    componentDidMount() {
      this.fetchMethod()  
    }

    
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Erreur :{error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading…</div>;
      } else {
        return (
          <div className="Character-Card--Container">
          <div className="research-bar">
            <label>
            Recherche:</label>
            <input  className="search-bar" type="text" name="search" onChange={e => this.researchCharacter(e.target.value)} />
          </div>
            {items.results.map(item => (
              <div key={item.name} className="Character-Card">
                <img src={item.image}></img>
                  <div class="Content-Holder">  
                    <h2>{item.name}</h2>
                    <ul>
                      <li className="List-Element"><b>Status:</b> <i>{item.status}</i></li>
                      <li className="List-Element"><b>Planète d'Origine:</b><i>{item.origin.name}</i></li>
                    </ul>
                  </div>
              </div>
            ))}
            <div class="Pagination--List">
            <button className="Pagination-Button" onClick={() => this.switchPage(items.info.prev)}>Précédent</button>
            <button className="Pagination-Button" onClick={() => this.switchPage(items.info.next)}>Suivant</button>
            </div>
          </div>
        );
      }
    }
  }

export default CharacterList;
