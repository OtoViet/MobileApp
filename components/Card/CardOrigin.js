import * as React from 'react';
import {Card, Title, Paragraph } from 'react-native-paper';
import Theme from '../../theme/Theme';

const CardOrigin = (props) => (
  <Card style={{marginLeft:20, marginRight:20, marginBottom:20, borderWidth:2,
  borderColor:Theme.colors.primary, borderStyle:'solid'}}>
    <Card.Cover source={props.srcImage} style={{height:400}} />
    <Card.Content style={{backgroundColor:Theme.colors.primary}}>
      <Title style={{color:'white', textAlign:'center'}}>{props.title}</Title>
      <Paragraph style={{color:'white', textAlign:'center'}}>
        Nhân viên
      </Paragraph>

    </Card.Content>
  </Card>
);

export default CardOrigin;