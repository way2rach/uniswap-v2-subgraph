import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Text, Flex } from 'rebass'
import { useTokenData } from '../../contexts/TokenData'
import { usePairData } from '../../contexts/PairData'
import Link from '../Link'
import { RowFixed } from '../Row'
import Logo from '../../assets/logo.svg'
import Wordmark from '../../assets/wordmark.svg'
// import LogoDark from '../../assets/logo_white.svg'
// import WordmarkDark from '../../assets/wordmark_white.svg'

import { useMedia } from 'react-use'

const TitleWrapper = styled.div`
  text-decoration: none;
  height: 40px;

  &:hover {
    cursor: pointer;
  }
`

const UniIcon = styled(Link)`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

export default function Title({ token, pair }) {
  const history = useHistory()

  const { name, symbol } = useTokenData(token)
  const { token0, token1 } = usePairData(pair)
  const symbol0 = token0 && token0.symbol
  const symbol1 = token1 && token1.symbol

  const below1080 = useMedia('(max-width: 1080px)')

  function getName() {
    if (below1080) {
      return ''
    }

    if (symbol0 && symbol1) {
      return (
        <div>
          / <span style={{ fontWeight: 400 }}>{symbol0 + '-' + symbol1}</span>
        </div>
      )
    }
    if (name && symbol) {
      return (
        <div>
          /{' '}
          <span style={{ fontWeight: 400 }}>
            {!below1080 ? name : ''} {'(' + symbol + ')'}
          </span>
        </div>
      )
    } else {
      return ''
    }
  }

  return (
    <TitleWrapper onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <RowFixed>
          <UniIcon id="link" onClick={() => history.push('/')}>
            <img src={Logo} alt="logo" />
          </UniIcon>
          <img style={{ marginLeft: '4px', marginTop: '0px' }} src={Wordmark} alt="logo" />
        </RowFixed>
        <Text fontWeight={600} mx="10px" lineHeight="1.5rem">
          {getName()}
        </Text>
      </Flex>
    </TitleWrapper>
  )
}