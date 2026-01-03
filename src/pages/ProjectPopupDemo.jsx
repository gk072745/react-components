import React from 'react';
import { useProjectPopup } from '@/customHooks/useProjectPopup';
import '@/assets/scss/pages/_project-popup-demo.scss';

const ProjectPopupDemo = () => {
  const { onShowPopup } = useProjectPopup();

  const showBasicPopup = () => {
    onShowPopup({
      title: 'Basic Popup',
      content: 'This is a basic popup with default configuration.',
    });
  };

  const showCustomSizePopup = () => {
    onShowPopup({
      title: 'Custom Size Popup',
      content: 'This popup has custom width and height.',
      width: '32rem',
      height: '12rem',
    });
  };

  const showNoHeaderPopup = () => {
    onShowPopup({
      showHeader: false,
      content: 'This popup has no header.',
      width: '20rem',
      height: '8rem',
    });
  };

  const showCustomButtonsPopup = () => {
    onShowPopup({
      title: 'Custom Buttons',
      content: 'This popup has custom button configuration.',
      buttonConfig: {
        isVisible: true,
        position: 'center',
        buttons: [
          {
            icon: '',
            buttonText: 'Cancel',
            isDisabled: false,
            classNames: ['white-btn'],
            callback: () => {
              console.log('Cancel clicked');
            },
          },
          {
            icon: '',
            buttonText: 'Confirm',
            isDisabled: false,
            classNames: ['blue-btn'],
            callback: () => {
              console.log('Confirm clicked');
            },
          },
        ],
      },
    });
  };

  const showLeftButtonsPopup = () => {
    onShowPopup({
      title: 'Left Aligned Buttons',
      content: 'Buttons are aligned to the left.',
      buttonConfig: {
        isVisible: true,
        position: 'left',
        buttons: [
          {
            icon: '',
            buttonText: 'Save',
            isDisabled: false,
            classNames: ['blue-btn'],
            callback: () => {
              console.log('Save clicked');
            },
          },
        ],
      },
    });
  };

  const showNoButtonsPopup = () => {
    onShowPopup({
      title: 'No Buttons',
      content: 'This popup has no action buttons.',
      buttonConfig: {
        isVisible: false,
      },
    });
  };

  const showHTMLContentPopup = () => {
    onShowPopup({
      title: 'HTML Content',
      content: '<p>This popup supports <strong>HTML</strong> content.</p><p>You can use <em>any</em> HTML tags.</p>',
      width: '28rem',
      height: '10rem',
    });
  };

  const showDeleteConfirmationPopup = () => {
    onShowPopup({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this item? This action cannot be undone.',
      width: '26rem',
      height: '9rem',
      buttonConfig: {
        isVisible: true,
        position: 'right',
        buttons: [
          {
            icon: '',
            buttonText: 'Cancel',
            isDisabled: false,
            classNames: ['white-btn'],
            callback: () => {
              console.log('Delete cancelled');
            },
          },
          {
            icon: '',
            buttonText: 'Delete',
            isDisabled: false,
            classNames: ['red-btn'],
            callback: () => {
              console.log('Item deleted');
            },
          },
        ],
      },
    });
  };

  const showDisabledButtonPopup = () => {
    onShowPopup({
      title: 'Disabled Button',
      content: 'One of the buttons is disabled.',
      buttonConfig: {
        isVisible: true,
        position: 'right',
        buttons: [
          {
            icon: '',
            buttonText: 'Cancel',
            isDisabled: false,
            classNames: ['white-btn'],
            callback: () => {
              console.log('Cancel clicked');
            },
          },
          {
            icon: '',
            buttonText: 'Submit',
            isDisabled: true,
            classNames: ['blue-btn'],
            callback: () => {
              console.log('Submit clicked');
            },
          },
        ],
      },
    });
  };

  const showNoOverlayPopup = () => {
    onShowPopup({
      title: 'No Overlay',
      content: 'This popup has no background overlay.',
      showOverlay: false,
      width: '24rem',
      height: '8rem',
    });
  };

  const showCustomClassPopup = () => {
    onShowPopup({
      title: 'Custom Class',
      content: 'This popup has a custom CSS class applied.',
      customClass: 'custom-popup-style',
      width: '26rem',
      height: '9rem',
    });
  };

  const showWithCallbackPopup = () => {
    onShowPopup({
      title: 'With Callback',
      content: 'This popup has an onClose callback that will log when it closes.',
      onClose: (reason) => {
        console.log('Popup closed with reason:', reason);
        alert(`Popup closed: ${reason}`);
      },
    });
  };

  return (
    <div className="project-popup-demo">
      <h1>Project Popup Component Demo</h1>
      <p>This page demonstrates the Project Popup component with various configurations and examples.</p>

      <section className="demo-section">
        <h2>Basic Examples</h2>
        <div className="demo-group">
          <button className="demo-button" onClick={showBasicPopup}>
            Basic Popup
          </button>
          <button className="demo-button" onClick={showCustomSizePopup}>
            Custom Size Popup
          </button>
          <button className="demo-button" onClick={showNoHeaderPopup}>
            No Header Popup
          </button>
          <button className="demo-button" onClick={showHTMLContentPopup}>
            HTML Content Popup
          </button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Button Configurations</h2>
        <div className="demo-group">
          <button className="demo-button" onClick={showCustomButtonsPopup}>
            Custom Buttons (Center)
          </button>
          <button className="demo-button" onClick={showLeftButtonsPopup}>
            Left Aligned Buttons
          </button>
          <button className="demo-button" onClick={showNoButtonsPopup}>
            No Buttons
          </button>
          <button className="demo-button" onClick={showDisabledButtonPopup}>
            Disabled Button
          </button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Use Cases</h2>
        <div className="demo-group">
          <button className="demo-button" onClick={showDeleteConfirmationPopup}>
            Delete Confirmation
          </button>
          <button className="demo-button" onClick={showWithCallbackPopup}>
            With Close Callback
          </button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Styling Options</h2>
        <div className="demo-group">
          <button className="demo-button" onClick={showNoOverlayPopup}>
            No Overlay
          </button>
          <button className="demo-button" onClick={showCustomClassPopup}>
            Custom CSS Class
          </button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Usage Example</h2>
        <div className="code-example">
          <pre>
            <code>{`import { useProjectPopup } from '@/customHooks/useProjectPopup';

const MyComponent = () => {
  const { onShowPopup } = useProjectPopup();

  const handleClick = () => {
    onShowPopup({
      title: 'My Popup',
      content: 'This is the popup content.',
      width: '24rem',
      height: '8rem',
      buttonConfig: {
        isVisible: true,
        position: 'right',
        buttons: [
          {
            buttonText: 'Cancel',
            classNames: ['white-btn'],
            callback: () => console.log('Cancelled'),
          },
          {
            buttonText: 'Confirm',
            classNames: ['blue-btn'],
            callback: () => console.log('Confirmed'),
          },
        ],
      },
      onClose: (reason) => {
        console.log('Popup closed:', reason);
      },
    });
  };

  return <button onClick={handleClick}>Show Popup</button>;
};`}</code>
          </pre>
        </div>
      </section>

      <section className="demo-section">
        <h2>Configuration Options</h2>
        <div className="config-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>title</td>
                <td>string</td>
                <td>''</td>
                <td>Popup header title</td>
              </tr>
              <tr>
                <td>content</td>
                <td>string</td>
                <td>''</td>
                <td>Popup content (supports HTML)</td>
              </tr>
              <tr>
                <td>width</td>
                <td>string</td>
                <td>'24.1875rem'</td>
                <td>Popup width</td>
              </tr>
              <tr>
                <td>height</td>
                <td>string</td>
                <td>'7.9375rem'</td>
                <td>Popup height</td>
              </tr>
              <tr>
                <td>showOverlay</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show background overlay</td>
              </tr>
              <tr>
                <td>showHeader</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show header with title and close button</td>
              </tr>
              <tr>
                <td>closeOnOverlayClick</td>
                <td>boolean</td>
                <td>true</td>
                <td>Close popup when clicking overlay</td>
              </tr>
              <tr>
                <td>buttonConfig</td>
                <td>object</td>
                <td>-</td>
                <td>Button configuration object</td>
              </tr>
              <tr>
                <td>customClass</td>
                <td>string</td>
                <td>''</td>
                <td>Custom CSS class for popup body</td>
              </tr>
              <tr>
                <td>onClose</td>
                <td>function</td>
                <td>null</td>
                <td>Callback function when popup closes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProjectPopupDemo;

