import React,{useContext, useState} from 'react'
import './Sidebar.scss'
import { AuthContext } from '../../context/AuthContext'
import { UserChatContext } from '../../context/ChatContext'

const Sidebar = ({setCurrentChat}) => {
  const userChats = useContext(UserChatContext)
  const user = useContext(AuthContext)
  const [search, setSearch] = useState("")


return (
<div className='sidebar'>
  <div className="top">
    <div className="header">
      <img 
      src={user.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAAEICAMAAAA5jNVNAAAAP1BMVEV1dXXAwMC+vr7CwsJycnK7u7urq6u3t7d2dnahoaGcnJyoqKh5eXm0tLSZmZl9fX2NjY2JiYmDg4OUlJRtbW0crqSPAAAGU0lEQVR4nO2d6XbbIBBGJRi0WtaW93/WApJjx/EmIHzQM/f0tP3T5oIGNKwqCoZhGIZhGIZhGIZhGIZhGIZhGIZhmJwhDdrBBdrEx/m8rgta5ihE4zx1g1JKlFIz5fMITLUvaz9obyH0L1EK2Y9oqw+hYpnaSgkpy7LUtV/XSpVl94X2+gAd7OPSDkrXe2nsNcL4l/KMVvsAGzMm1LW1DplvhFDpxz4149qLq7G6+peySl2faOq3gH9E6v50Wk1X88Re+w9jwgWgphvK5/KWek21AFSs9Wt5ZVqF7v7TLME8WEf1wn8rwJBgH0RN/y5y9vo3JWjRuvfQNLy1v0FWacUQnaVU9YvI+YF+pcl6TqgAp6qU6lXg38eRTiPKcyoFoMbEjnivfeuvSaQANB4K/S2A7B89Wt3SDAftr8WoTvhHcLz2r8jqhNan1tm+TOBFQKt77dsCdFj/pXbS/u6shISmc67Rc9PZKqT+fKzff4QccG3Yr/FewEXQ6fOU4QU1Sp8mv85nB9aEqQqhD2wBzpnDTwRoQnd06/x/AZrPpTlI89X+mEyaJt++/+Lfgeqf/f8P/zbz+O8z98dMSufvH0Yf5u85dmR/9md/9nf3D6MP8z9nXv+5+3eZ+7fsz/7sz/7sz/6OCLOlFfX+NT/e099sm4DVv3/1Y/0DxA/SP0T+BvMnClf/LWBHdGc24/lPwG31P8+xl8Ds2pEK429+j70Es6iDe66e+m//SewmEGrtbid6E26qQMnD7h97CYP6sP6x1+CDJW+7f+wl4ND1H90/9/oPNfmzE3s7cbDJW4tUsbdw0BK0/uvoR9pOIfXl0MT2p6D+8TNoUgEDCLCDgEImEAj/KUT6efEH7MBaAu2+sv7R7TXh3sCyAujTHK4BYDbwBWvBoA2gY5D9nyJ+8rNj9g8H6INA298Ku3/bewJU5w6w8/B6EBzAH7P7zaAHAQH8cadRaRbe/vFT/1uU8J0HkgPwNgsa/M+/YDav7v7+sxDQy1ACjOIl9PyX/wkY7IUQi+8oDHv+rmg8G4DuPaH+ngEkJPoMc+PVfypw+Hj3oAJ9gJlMC/5xx8/n7jr5gKXO1wLoYbA4cHfCbQEUMne4YA9xurUCaO5wwf0YAzR1u+KeRCRyh0hjZoIOrmWbxfsUosfiMI5U0IPjd9CoDte/Ao57fzHWDv74vv8b/RI7Gj8qic5zZxHlMX+RlL+Zys3aX2fRx+I/Mf828/rvM/evyrz9Bxf/dPp/6380hQbdmvCQ+mj9p+U/5u1vLiI4Po+emn++8W8PEmZb/0RfZ5e9uHL9SqEAp2mo3NaQ1NBG37X0C7sP0XX8rsC31/kvAKCnPz3nz+WA1dcDL7/1U4HVNxfw+YGdgfNe/5LYb0l4rz+C1y++PC5f3fyhk1je+x9ECV2/s2sXfg+gRD6A0VdeQXtQ/wOcApqGNkHOUMGm0QPc32UGPQLTgoka/+s/7bplf4r/SSfSab+tfaeV35/+UrRT1IvEicbrdzq8+v/99KOUQxftIVAzm0/rXDp+z/q//HMpqzXCQ6BGV70It3H7pvSyrNux+dMiEC39q6/TeKL/52r6uzCicaqefxkoFKpd/uIh6DZ7fvN1mmAl6IM/BGqmynmW4TBSqm4JWAQqprefNQpdgroPVAITOObjdQFP63xahAAdKhVLb8JeqAB3DRzBVtfQjYVPEbZvkZX2lhi/ROEw9sfpx+7RlnV/+fJbZDHQP36YnL6VZL5FJuPW+WN0QzgXRx8CLZ2QAQ63hEHK/shWLaJTu+1rxvtf1nVU9Wl/qpOcdg/7yG32EUJ959jV/EF/qjvMVgU8WeqL6fm+/169HefYui+D3MzyB+im3L16IVzsY7+sjlB3z7pT3Wr3kUkCcf8EY/b4GdCpE3GTNDeE0unp+f4ZEOm3VQb2O2JYf+rPQ7qt9gE6jIa70Cldd8EjELpbvel1tlWInPzV1Z/WHJrtb3b9rx4t4sim73uAC8cWPLnW/uYf+halmBR2BSKbLv8Xhd13l7M/9UkMcB3Zlz+zeWfds2+7y9e/qLLKGe4pOnvyEq3hTJFRvv+IAi3gCftjYX8s7I+F/bGwPxb2x8L+WNgfC/tjYX8s7I+F/bGwPxb2x8L+WNgfC/tjYX8s7I+F/bGwPxb2x/IPbzB88KFsqiMAAAAASUVORK5CYII="}
      alt=""
      />
      <h4 className="name">{user.name}</h4>
    </div>
    <div className="search">
        <input
        type="text"
        placeholder='Search..'
        onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  </div>
  <div className="bottom">
    <ul>
      {userChats.filter(chat => {
        const person = chat.persons.find(p => p.id !== user.id)
        return person?.name?.toLowerCase().trim().startsWith(search.toLowerCase().trim())
      }).map(chat => {
        const person = chat.persons.find(p => p.id !== user.id)
        return (
        <li key={person.id} onClick={() => setCurrentChat(chat)}>
          <img
          src={person.image || "data:image/png;base64,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"}
          alt=""
          />
          <div>
            <p className="name">{person.name}</p>
            {chat?.messages &&
            <p className="message">{chat?.messages[chat?.messages?.length - 1]?.text || ""}</p>}
          </div>
        </li>
        )}) 
      } 
    </ul>
  </div>
</div>
)}

export default Sidebar