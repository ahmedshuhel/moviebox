import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import {BasicList, SettingsItem, Modal, FileExplorer} from '../../components/components.jsx';
import SettingsPageState from '../../app.state/states/pages/settings';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.settingsItems = [
      {
        title: 'Folders',
        subtitle: 'Specify Folder paths to scan for movie files(i.e. mp4, avi)',
        actions: [
          {
            title: 'Add Folder',
            type: 'primary',
            callback: () => {
              this.props.showFileExplorerModal();
            }
          }
        ]
      },
      {
        title: 'Exclude Folders',
        subtitle: 'Specify which Folders should be ignored during scan if they are present in selected Folder paths',
        actions: []
      }
    ];
  }

  isFileExplorerModalVisible() {
    return _.get(this.props.state, 'shouldShowFileExplorer', false);
  }

  addToRootFolderList(folder) {
    this.props.addToRootFolderList(folder);
    this.props.closeFileExplorerModal();
  }

  render () {
    return (
      <div>
        <div className="container-fluid settings-page">
          <div className="row page-title">
            <h4>Settings</h4>
          </div>

          <div className="row page-content">
            <BasicList listClass={'settings-items'} itemComponent={SettingsItem} items={this.settingsItems}/>
          </div>
        </div>
        <Modal title={'Select a folder to scan for Movie files'}
               isVisible={this.isFileExplorerModalVisible()} onModalClose={() => this.props.closeFileExplorerModal()}>
          <FileExplorer onFolderChoose={(folder) => this.addToRootFolderList(folder)}/>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.pages.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeFileExplorerModal: SettingsPageState.hideFileExplorerModal,
    showFileExplorerModal: SettingsPageState.showFileExplorerModal,
    addToRootFolderList: SettingsPageState.addToRootFolderList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
