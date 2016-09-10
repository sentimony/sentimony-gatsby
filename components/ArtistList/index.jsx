import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import Ink from 'react-ink'

import './style.scss'

class ArtistList extends React.Component {
    render() {
        const pageLinks = []

        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.id'))
        sortedPages.forEach((page) => {
            if (access(page, 'file.ext') === 'md' && access(page, 'data.category') === 'artists') {
                const id = access(page, 'data.id') || page.path
                const key = access(page, 'data.key') || page.path
                const title = access(page, 'data.title') || page.path

                pageLinks.push(
                    <Link key={ key } to={ prefixLink(page.path) } className='artist-list__link' activeClassName='is-selected' >
                        <div className='artist-list__thumbnail'>
                            <img className='artist-list__cover' src={ prefixLink(`${ page.path }${ key }.jpg`) } />
                        </div>
                        <div className='artist-list__title'>{ title }</div>
                        <Ink />
                    </Link>
                )
            }
        })

        return (
            <div className='artist-list'>
                { pageLinks }
            </div>
        );
    }
}

ArtistList.propTypes = {
    route: React.PropTypes.object,
}

export default ArtistList
