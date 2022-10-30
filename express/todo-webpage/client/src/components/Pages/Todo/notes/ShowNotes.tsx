import React, { useContext } from 'react';
import DataContext from "../../../Context/DataContext";
import { Card, Col, Row , Button, Typography } from 'antd';

export default function ShowNotes(props: any): JSX.Element {

    const context = useContext(DataContext);
    const { notes, setNotes } = context;
    const { note, updateNote, index } = props;

    async function deleteNote() {
        try {
            const res = await fetch(`/deletenote/${note._id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json",
                }
            })
            const data = res.json();
            const newNotes = notes.filter((d: any) => { return d._id !== note.id })
            setNotes(newNotes)
            window.alert("Note Deleted Successfully!");
            window.location.reload()
        } catch (e) {
            console.log(e);
        }
      }


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
                    <Button onClick={deleteNote}>
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
