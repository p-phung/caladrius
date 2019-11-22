import * as React from "react";

export class ModelSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
        };
        this.handle_change = this.handle_change.bind(this);
    }

    componentDidMount() {
        fetch("/api/models")
            .then(res => res.json())
            .then(models => {
                this.setState({ models: models });
            });
    }

    handle_change(event) {
        const current_model = this.state.models[event.target.value];
        this.props.load_model(current_model);
        event.preventDefault();
    }

    create_select_options() {
        let items = [
            <option key={""} value={""} disabled>
                Choose a trained model
            </option>,
        ];
        this.state.models.forEach((model, index) => {
            items.push(
                <option key={model.model_name} value={index}>
                    {model.model_name}
                </option>
            );
        });
        return items;
    }

    render() {
        return (
            <div className="select">
                <select
                    value={this.props.current_model}
                    onChange={this.handle_change}
                >
                    {this.create_select_options()}
                </select>
            </div>
        );
    }
}
