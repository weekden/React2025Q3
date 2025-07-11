import { Component, type ReactNode } from 'react';
import Header from '../header/Header';
import Search from '../search/Search';
import type { MainState } from '../../types/data';
import CardList from '../cardList/CardList';

class Page extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
      query: '',
    };
  }

  componentDidMount(): void {
    this.queryChange('');
  }

  queryChange = async (query: string) => {
    const response = await fetch(
      `https://zelda.fanapis.com/api/characters?name=${query.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error('Monster not found');
    }
    const result = await response.json();
    console.log(result);

    this.setState({ data: result.data });
  };

  render(): ReactNode {
    return (
      <>
        <Header title="Zelda monsters store" />
        <Search onQueryChange={this.queryChange} />
        <CardList data={this.state.data}></CardList>
      </>
    );
  }
}
export default Page;
