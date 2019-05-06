import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import Block from './Block';
import DraggableBlock from './DraggableBlock';

export default class Stack extends Component {
    emptySpaces = [];

    renderBlocks = staticBlocks => {
        const { isStackSelected } = this.props;
        const stack = this.props.stack;
        let selectedBlock;

        if (isStackSelected) {
            selectedBlock = stack.findIndex((block, index) => isStackSelected && !block.isEmpty)
        }

        console.log('staticBlocks : ', staticBlocks)

        const blocks = stack.map((block, index) => {
            if (block.isEmpty === true) {
                this.emptySpaces.push(index);
            }

            if (staticBlocks) {
                return (
                    <Block
                        key={ index }
                        block={ block }
                        isSelected={ isStackSelected && selectedBlock >= 0 && selectedBlock === index }
                    />
                );
            }

            return (
                <DraggableBlock
                    key={ index }
                    block={ block }
                    isSelected={ isStackSelected && selectedBlock >= 0 && selectedBlock === index }
                />
            );

            // return (
            //     <TouchableWithoutFeedback onPress={ this.handleClick }>
            //         <View>
            //             <Block
            //                 key={ index }
            //                 block={ block }
            //                 isSelected={ isStackSelected && selectedBlock >= 0 && selectedBlock === index }
            //             />
            //         </View>
            //     </TouchableWithoutFeedback>
            // );
        });

        return blocks;
    };

    handleClick = () => {
        const {
            id,
            stack,
            isStackSelected,
            moveSelectedBlock,
            handleStackSelect,
        } = this.props;

        const availableSpace = ((id * 3) + this.emptySpaces[this.emptySpaces.length - 1]);

        const findFirstAvailableBlock = block => {
            return !block.isEmpty;
        }
        const selectedBlock = stack.findIndex(findFirstAvailableBlock);
        const selectBlockPos = ((id * 3) + selectedBlock);


        if (isStackSelected && this.emptySpaces.length > 0) {
            moveSelectedBlock(availableSpace, id);
            return;
        } else if (this.emptySpaces.length > 0) {
            handleStackSelect(id, selectBlockPos, availableSpace);
            return;
        } else {
            handleStackSelect(id, selectBlockPos);
            return;
        }
    }

    render() {
        const {
            isBoardSelected,
            isStackSelected,
            staticBoard,
        } = this.props;

        const blocks = this.renderBlocks(staticBoard);

        return (
            <View style={ [styles.container, this.emptySpaces.length && isBoardSelected && styles.available, isStackSelected && styles.selected] }>
                <View style={ styles.pole } />
                { blocks }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 4,
        paddingRight: 4,
    },
    pole: {
        position: 'absolute',
        bottom: 0,
        top: -16,
        width: 16,
        backgroundColor: '#2b1d0e',
        alignSelf: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});
