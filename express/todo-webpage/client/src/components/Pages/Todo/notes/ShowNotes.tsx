import React, { useContext, useEffect, useRef, useState } from 'react';
import DataContext from "../../../Context/DataContext";
import NotesItems from './NotesItems';
import { Card, Col, Row , Button, Typography } from 'antd';

export default function ShowNotes(props: any): JSX.Element {

    const context = useContext(DataContext);
    const { deleteNote} = context;
    const { note, updateNote, index } = props;

    function del() {
        deleteNote(note._id);
        window.alert("Note Deleted Successfully!");
        window.location.reload();
    }

    const [checked, setChecked] = useState<boolean>(true);


      const style = {
        margin: '10px 0px 0px 0px',
      }
      return (
          <div>
        <Row gutter={16} style={style}>
            <Col span={10}>
                <Card title={
                    <Typography.Title level={3}>
                        Note Number : {index + 1}
                    </Typography.Title>
                } 
                size="small"
                >
                    <Typography.Title level={4}>
                        Title: {note.title}
                    </Typography.Title>
                    <Typography.Title level={5}>
                        Description: {note.description}
                    </Typography.Title> 
                    <Typography.Title level={5}>
                        Category: {note.category}
                    </Typography.Title>
                    <Button onClick={del}>
                        Delete
                    </Button>
                    <Button onClick={() => {updateNote(note)}}>
                        Update Note
                    </Button>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
